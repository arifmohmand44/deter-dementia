'use client'
import { useState, useEffect } from "react";
import { QuestionsData } from "@/data/questionnaire";
import { QuestionType } from "@/types/questions";
import Loader from "@/components/loader";
import Button from "@/components/button";
import { Select } from "@/components/forms/select";
import { InputField } from "@/components/forms/input-field";
import { useRouter } from "next/navigation";
import { Conversions } from '@/components/providers/conversion';

export default function Questionnaire() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [submitData, setSubmitData] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    const [answers, setAnswers] = useState(() => {
        const initialAnswers: Record<string, string | number | null> = {};
        QuestionsData.forEach((q: QuestionType) => {
            initialAnswers[q.key] = q.value !== undefined && q.value !== null ? q.value : null; // Set default value if provided

            // Initialize values for "more" questions
            if (q.more && q.more.length > 0) {
                q.more.forEach((moreQ) => {
                    initialAnswers[moreQ.key] = moreQ.value !== undefined && moreQ.value !== null ? moreQ.value : null
                })
            }
        });
        return initialAnswers;
    });

    const handleAnswer = (answer: string | number, key: string = QuestionsData[currentQuestion].key) => {

        setAnswers(prevAnswers => {
            const newAnswers = { ...prevAnswers, [key]: answer };
            // Handle unit conversions if the key is a conversion field
            if (key in Conversions) {
                const { oppositeKey, factor, precision } = Conversions[key as keyof typeof Conversions];
                const numericAnswer = Number(answer);
                if (!isNaN(numericAnswer)) {
                    newAnswers[oppositeKey] = parseFloat((numericAnswer * factor).toFixed(precision));
                }
            }
            return newAnswers;
        });
    };


    const handleNext = () => {
        if (currentQuestion < QuestionsData.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleSubmit = async () => {
        try {
            setSubmitData(true);
            setError('');
            setSuccess('');


            const response = await fetch('/api/questionnaire', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(answers),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Submission failed. Please try again.');
            }

            setSuccess('Your questionnaire has been submitted successfully!');
            router.push("/d-summary");
        } catch (err: any) {
            console.error('Submission error:', err);
            setError(err.message || 'An error occurred while submitting. Please try again.');
        } finally {
            // setSubmitData(false);
        }
    };

    const currentQ = QuestionsData[currentQuestion];

    useEffect(() => {
        if (currentQ.type === "multi") {
            handleAnswer(currentQ.value ?? "");
        }
    }, [currentQuestion]);

    const progress = ((currentQuestion + 1) / QuestionsData.length) * 100;

    return (
        <>
            {!submitData && (
                <>
                    <div className="w-full bg-gray-200 h-3 mb-2 relative">
                        <div
                            className={`bg-indigo-600 h-3 text-white text-xs font-bold flex items-center justify-center ${progress < 100 ? 'rounded-e-full' : ''}`}
                            style={{ width: `${progress}%`, minWidth: "30px" }} // Ensures visibility even at small percentages
                        >
                            {progress.toFixed(0)}%
                        </div>
                    </div>
                    <h2 className="text-lg text-center text-gray-600 font-semibold">
                        Question {currentQuestion + 1} of {QuestionsData.length}
                    </h2>
                    <div className="flex justify-center items-center gap-20 xs:gap-5 h-[32rem]">
                        <div className="text-center max-w-full p-4">
                            <h2 className={`text-xl font-bold mb-6 break-words`}>{currentQ.text}</h2>
                            <div className="flex justify-center gap-20 xs:gap-5">
                                {/* Previous Button */}
                                <Button
                                    onClick={handlePrevious}
                                    text="Previous"
                                    disabled={currentQuestion < 1}
                                    className="flex justify-center items-center rounded-3xl h-10 w-32 border-gray-400 text-gray-600 hover:bg-gray-300 focus-visible:outline-gray-400"
                                />

                                {/* Question Input */}
                                <div className="w-full">
                                    {currentQ.type !== "multi" && (
                                        <div className={`relative ${currentQ.more && currentQ.more.length > 0 ? 'mb-10' : ''} inline-flex border border-indigo-500 rounded-full overflow-hidden`}>
                                            {currentQ.type === "gender" || currentQ.type === "yesno" ? (
                                                <>
                                                    {(currentQ.options || (currentQ.type === "gender" ? ["Male", "Female"] : ["Yes", "No"])).map(
                                                        (option) => (
                                                            <Button
                                                                key={option}
                                                                text={option}
                                                                className={`px-6 py-[7px] border-none shadow-none transition-colors ${answers[currentQ.key] === option ? "bg-indigo-500 text-white" : "bg-white text-indigo-500"}`}
                                                                onClick={() => handleAnswer(option)}
                                                            />
                                                        ),
                                                    )}

                                                </>
                                            ) : currentQ.type === "select" ? (
                                                <div className="relative h-9 flex-1 inline-flex border border-indigo-500 rounded-full overflow-hidden">
                                                    <Select
                                                        className="px-4 bg-white text-indigo-500"
                                                        options={(currentQ.options || []).map(opt => ({ value: opt, label: opt }))}
                                                        value={String(answers[currentQ.key] ?? currentQ.value ?? "")}
                                                        onChange={(value) => handleAnswer(value)}
                                                    />
                                                </div>
                                            ) : currentQ.type === "number" ? (
                                                <InputField
                                                    type="number"
                                                    onChange={(e) => {
                                                        const value = Number(e.target.value);
                                                        if (value >= Number(currentQ.min) && value <= Number(currentQ.max)) {
                                                            handleAnswer(value);
                                                        }
                                                    }}
                                                    value={String(answers[currentQ.key] ?? currentQ.value ?? "")}
                                                    className={'max-w-[146px] h-10 p-2 text-indigo-500 text-xl font-bold focus:outline-none focus:ring-1 focus:ring-indigo-400'}
                                                />
                                            ) : currentQ.type === "text" ? (
                                                <InputField
                                                    type="text"
                                                    placeholder="Enter here"
                                                    className={'h-9 p-2 text-indigo-500 text-xl font-bold focus:outline-none focus:ring-1 focus:ring-indigo-400'}
                                                />
                                            ) : null}
                                        </div>
                                    )}
                                    {/* If have more questions */}
                                    {currentQ.more && currentQ.more.length > 0 && (answers[currentQ.key] === "Multi" || answers[currentQ.key] === "Yes") && (
                                        <div className={`grid grid-cols-1 gap-4`}>
                                            {currentQ.more?.map((moreQuestion, index) => (
                                                <div key={moreQuestion.key} className={`${moreQuestion.type === "text" ? "" : "flex flex-wrap md:flex-nowrap"} items-start gap-4 w-full`}>
                                                    <h3 className={`font-medium md:mb-1 w-full md:w-auto flex-1 ${moreQuestion.type === "text" ? "" : "text-left"}`}>{moreQuestion.text}</h3>
                                                    {moreQuestion.type === "select" ? (
                                                        <div className="relative h-8 inline-flex border border-indigo-500 rounded-full overflow-hidden">
                                                            <Select
                                                                className="px-4 bg-white text-indigo-500"
                                                                options={(moreQuestion.options || []).map(opt => ({ value: opt, label: opt }))}
                                                                value={String(answers[moreQuestion.key] ?? moreQuestion.value ?? "")}
                                                                onChange={(value) => handleAnswer(value, moreQuestion.key)}
                                                            />
                                                        </div>
                                                    ) : moreQuestion.type === "number" ? (
                                                        <InputField
                                                            type="number"
                                                            name={moreQuestion.key}
                                                            onChange={(e) => {
                                                                const value = Number(e.target.value);
                                                                if (value >= Number(moreQuestion.min) && value <= Number(moreQuestion.max)) {
                                                                    handleAnswer(value, moreQuestion.key);
                                                                }
                                                            }}
                                                            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                                                // For onKeyDown, we need to get the value differently
                                                                const target = e.currentTarget as HTMLInputElement;
                                                                const value = Number(target.value);
                                                                if (value >= Number(moreQuestion.min) && value <= Number(moreQuestion.max)) {
                                                                    handleAnswer(value, moreQuestion.key);
                                                                }
                                                            }}
                                                            value={String(answers[moreQuestion.key] ?? moreQuestion.value ?? "")}
                                                            min={Number(moreQuestion.min)}
                                                            className={'max-w-[146px] h-10 p-2 text-indigo-500 text-xl font-bold focus:outline-none focus:ring-1 focus:ring-indigo-400'}
                                                        />

                                                    ) : moreQuestion.type === "text" ? (
                                                        <InputField
                                                            type="text"
                                                            placeholder="Enter here"
                                                            className={'h-10 p-2 text-indigo-500 text-xl font-bold focus:outline-none focus:ring-1 focus:ring-indigo-400'}
                                                        />
                                                    ) : moreQuestion.type === "yesno" ? (
                                                        <div className="max-w-[180px] relative inline-flex border border-indigo-500 rounded-full overflow-hidden">
                                                            {(moreQuestion.options || ["Yes", "No"]).map((option) => (
                                                                <Button
                                                                    key={option}
                                                                    text={option}
                                                                    className={`px-6  border-none shadow-none transition-colors ${answers[moreQuestion.key] === option ? "bg-indigo-500 text-white" : "bg-white text-indigo-500"}`}
                                                                    onClick={() => handleAnswer(option, moreQuestion.key)}
                                                                />
                                                            ))}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Next And Submit Button */}
                                {currentQuestion === QuestionsData.length - 1 ? (
                                    <Button
                                        className="flex justify-center items-center rounded-3xl h-10 w-32 border-indigo-700 text-white bg-indigo-700 hover:bg-indigo-500 focus-visible:outline-indigo-700"
                                        onClick={handleSubmit}
                                        text="Submit"
                                    />
                                ) : (
                                    <Button
                                        className="flex justify-center items-center rounded-3xl h-10 w-32 border-indigo-700 text-indigo-500 hover:bg-indigo-500 hover:text-white focus-visible:outline-indigo-700"
                                        onClick={handleNext}
                                        text="Next"
                                    />
                                )}
                            </div>
                            {error && (
                                <div className="text-red-500 text-center mt-4">
                                    {error}
                                </div>
                            )}
                            {success && (
                                <div className="text-green-500 text-center mt-4">
                                    {success}
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
            {
                submitData && (
                    <div className="flex flex-col justify-center items-center gap-20 xs:gap-10 h-[32rem]">
                        <h2 className="text-3xl text-center text-indigo-500 font-semibold">
                            We&apos;re Processing Your <br />Result...
                        </h2>
                        <Loader />
                        <p className="text-center">Ipsum redirects here. For the car, see Toyota Ipsum.<br />
                            Using Lorem ipsum to focus attention on graphic elements in a webpage design proposal<br />
                            An example of the Lorem ipsum placeholder text on a Letraset sample sheet. Date unknown, possibly
                        </p>
                    </div>
                )
            }
        </>
    );
}
