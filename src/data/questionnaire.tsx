import { QuestionType } from "@/types/questions";

export const QuestionsData: QuestionType[] = [
    { key: "Sex", text: "What is your sex at birth?", type: "gender", value: "Male", options: ["Male", "Female"] },
    { key: "Age", text: "What is your current age?", type: "number", value: 60, min: 0, max: 120 },
    {
        key: "Genetic_Status",
        text: "Do you know your APOE genetic status?",
        type: "yesno",
        value: "No",
        options: ["Yes", "No", "Not-Sure"],
        more: [
            {
                key: "APOE_Genetic_Status",
                text: "What is your APOE genetic status?",
                type: "select",
                value: "APOE2/2",
                options: ["APOE2/2", "APOE2/3", "APOE2/4", "APOE3/3", "APOE3/4", "APOE4/4"],
            },
        ],
    },
    {
        key: "Genetic_Markers", text: "Do you have any of the following genetic markers?", type: "multi",
        value: "Multi",
        more: [
            { key: "Genetics_APP", text: "APP", type: "yesno", value: "Yes" },
            { key: "Genetics_PSEN1", text: "PSEN1 / PSEN2", type: "yesno", value: "No" },
        ]
    },
    {
        key: "Genetics_Other", text: "Do you have any other genes known to be associated with dementia? Enter details here",
        type: "yesno", value: "No",
        options: ["Yes", "No", "Not-Sure"],
        more: [
            { key: "Associated_dementia", text: "", type: "text" }
        ]
    },
    {
        key: "Ethnicity",
        text: "What is your ethnicity?",
        type: "select",
        value: "South Asian",
        options: ["Caucasian", "South Asian", "East Asian", "Black", "Other"],
    },
    { key: "Family_History", text: "Do you have a family history of dementia in a first-degree relative?", type: "yesno", value: "Yes" },
    { key: "Develop_dementia", text: "At what age(s) did your relative develop dementia?", type: "text" },
    {
        key: "Smoking_Status", text: "Are you a current or former cigarette smoker?", type: "yesno", value: "No",
        more: [
            {
                key: "Cigarettes_per_day",
                text: "Average cigarettes per day",
                type: "select",
                value: "1-10",
                options: ["1-10", "11-20", "21-30", "31-40", "> 40"],
            },
            {
                key: "Number_of_years_smoking",
                text: "Number of years smoking",
                type: "select",
                value: "1-5",
                options: ["1-5", "6-10", "11-20", "> 20"],
            },
            // { key: "Amount_of_smoking", text: "*Important note", type: "text" }
        ],
    },
    {
        key: "Alcohol_Use", text: "Do you drink alcohol?", type: "yesno", value: "No",
        more: [
            {
                key: "Drinks_per_week",
                text: "Average number of alcoholic drinks per week",
                type: "select",
                value: "1-3",
                options: ["1-3", "4-7", "7-14", "14+"],
            },
            {
                key: "Number_of_years",
                text: "Number of years ",
                type: "select",
                value: "0-5",
                options: ["0-5", "6-10", "11-20", "> 20"],
            },
            // { key: "Amount_of_alcohol", text: "*Important note", type: "text" }
        ],
    },
    {
        key: "Current_Height", text: "What is your height?", type: "multi",
        value: "Multi",
        more: [
            { key: "Height_in_meter", text: "Meter", type: "number", value: 1, min: 1, max: 120 },
            { key: "Height_in_feet", text: "Feet", type: "number", value: 3.28, min: 1, max: 120 },
        ]
    },
    {
        key: "Current_Weight", text: "What is your current weight?", type: "multi",
        value: "Multi",
        more: [
            { key: "Weight_in_kilogram", text: "Kilogram", type: "number", value: 1, min: 1, max: 120 },
            { key: "Weight_in_pound", text: "Pound", type: "number", value: 2.20, min: 1, max: 200 },
        ]
    },
    {
        key: "Diet", text: "What is your Diet?", type: "multi",
        value: "Multi",
        more: [
            { key: "Mediterranean_Diet", text: "Do you follow the Mediterranean diet?", type: "yesno", value: "No" },
            { key: "MIND_diet", text: "Do you follow the MIND diet?", type: "yesno", value: "No" },
            { key: "Diet_other", text: "Do you follow any other specific diet?", type: "yesno", value: "No" },
        ]
    },
    { key: "Years_of_formal_education", text: "How many years of formal education do you have?", type: "number", value: 8, min: 0, max: 20 },
    { key: "Languages_spoken_learnt", text: "How many languages are you conversant in?", type: "number", value: 0, min: 1, max: 8 },
    { key: "Musical_instrument_skills", text: "Do you play any musical instruments regularly?", type: "yesno", value: "No" },
    {
        key: "Lifestyle", text: "Lifestyle", type: "multi",
        value: "Multi",
        more: [
            { key: "Sedentary_lifestyle", text: "Do you have a mostly sedentary lifestyle?", type: "yesno", value: "Yes" },
            { key: "Resistance_training", text: "Do you engage in regular resistance training exercise?", type: "yesno", value: "No" },
            { key: "Aerobic_exercise", text: "Do you engage in aerobic exercise?", type: "yesno", value: "No" },
            { key: "Other_exercise", text: "Do you engage in any other exercise on a regular basis?", type: "yesno", value: "No" },
        ]
    },
    {
        key: "Socioeconomic_status",
        text: "What is your socioeconomic status?",
        type: "select",
        value: "Lower",
        options: ["Lower", "Middle", "Upper"],
    },
    { key: "Social_networks", text: "Do you have strong social networks with whom you interact regularly?", type: "yesno", value: "No" },
    { key: "Air_pollution", text: "Which of the following describes the place you live?", type: "select", value: "Rural", options: ["Rural", "Suburban", "Urban"] },
    {
        key: "Ever_Had", text: "Have you ever had any of the following:", type: "multi",
        value: "Multi",
        more: [
            { key: "Stroke", text: "Stroke", type: "yesno", value: "Yes" },
            { key: "Traumatic_brain_injury", text: "Traumatic Brain Injury", type: "yesno", value: "No" },
            { key: "Concussion_History", text: "Concussion", type: "yesno", value: "No" },
            { key: "Brain_tumour", text: "Brain Tumour", type: "yesno", value: "No" },
            { key: "Brain_surgery", text: "Brain Surgery", type: "yesno", value: "No" },
        ]
    },
    {
        key: "Known_History", text: "Do you have a known history of:", type: "multi",
        value: "Multi",
        more: [
            { key: "Epilepsy", text: "Epilepsy", type: "yesno", value: "No" },
            { key: "HIV", text: "HIV", type: "yesno", value: "No" },
            { key: "Multiple_sclerosis", text: "Multiple Sclerosis", type: "yesno", value: "No" },
            { key: "Huntington_disease", text: "Huntington's Disease", type: "yesno", value: "No" },
            { key: "Parkinson_disease", text: "Parkinson's Disease", type: "yesno", value: "No" },
            { key: "Creutzfeldt_Jakob_disease", text: "Creutzfeldt-Jakob Disease (CJD)", type: "yesno", value: "No" },
            { key: "Amyotrophic_lateral_sclerosis", text: "Amyotrophic Lateral Sclerosis (ALS)", type: "yesno", value: "No" },
        ]
    },
    {
        key: "You_Have", text: "Do you have:", type: "multi",
        value: "Multi",
        more: [
            { key: "Hypertension", text: "Hypertension (High Blood Pressure)", type: "yesno", value: "Yes" },
            { key: "Coronary_Artery_Disease", text: "Coronary Artery Disease (Known heart disease, prior heart attack, etc)", type: "yesno", value: "Yes" },
            { key: "Arrhythmia", text: "Any Cardiac Arrhythmia (Irregular heart beat)", type: "yesno", value: "Yes" },
            { key: "Dyslipidemia", text: "Dyslipidemia (abnormal cholesterol)", type: "yesno", value: "Yes" },
        ]
    },
    { key: "Cardiac_arrest_history", text: "Have you ever had a cardiac arrest? (Meaning your heart stopped completely requiring CPR)", type: "yesno", value: "No" },
    {
        key: "Medical_Conditions", text: "Do you have any of the following medical conditions?", type: "multi",
        value: "Multi",
        more: [
            { key: "Type_1_Diabetes", text: "Type 1 Diabetes", type: "yesno", value: "No" },
            { key: "Type_2_Diabetes", text: "Type 2 Diabetes", type: "yesno", value: "Yes" },
            { key: "Renal_disease", text: "Renal Disease", type: "yesno", value: "No" },
            { key: "Rheumatoid_arthritis", text: "Rheumatoid Arthritis", type: "yesno", value: "No" },
        ]
    },
    {
        key: "Health_Conditions", text: "Do you have any of the following mental health conditions?", type: "multi",
        value: "Multi",
        more: [
            { key: "Depression", text: "Depression", type: "yesno", value: "Yes" },
            { key: "Anxiety", text: "Anxiety", type: "yesno", value: "No" },
            { key: "Schizophrenia", text: "Schizophrenia", type: "yesno", value: "No" },
            { key: "Psychosis_for_other_reason", text: "Other type of psychosis", type: "yesno", value: "No" }
        ]
    },
    {
        key: "Development", text: "Do you have any of the following?", type: "multi", value: "Multi",
        more: [
            { key: "Developmental_delay", text: "Developmental Delay?", type: "yesno", value: "No" },
            { key: "Down_Syndrome", text: "Down Syndrome?", type: "yesno", value: "No" }
        ]
    },
    {
        key: "Types_of_medications", text: "Do you currently take any of the following types of medications?", type: "multi",
        value: "Multi",
        more: [
            { key: "Benzodiazepine_use", text: "Benzodiazepines", type: "yesno", value: "Yes" },
            { key: "Antipsychotic_use", text: "Antipsychotics", type: "yesno", value: "No" },
            { key: "Other_psychiatric_medications", text: "Other psychiatric medications", type: "yesno", value: "No" },
            { key: "Anticholinergic_medication_use", text: "Anticholinergic medications", type: "yesno", value: "Yes" },
            { key: "Statin_use", text: "Statins", type: "yesno", value: "Yes" },
            { key: "Aspirin_use", text: "Aspirin", type: "yesno", value: "Yes" },
            { key: "Antihypertensive_medication_use", text: "Antihypertensive (Blood Pressure) medications", type: "yesno", value: "Yes" },
        ]
    },
    { key: "ICU_stay_any_reason", text: "Have you ever spent more than 24h as a patient in the Intensive Care Unit?", type: "yesno", value: "No" },
    { key: "Delirium_history", text: "Have you ever had delirium?", type: "yesno", value: "No" },
    { key: "Hearing_impairment", text: "Do you have uncorrected hearing impairment?", type: "yesno", value: "Yes" },
    { key: "Visual_impairment", text: "Do you have uncorrected visual impairment?", type: "yesno", value: "No" },
    {
        key: "Sleep", text: "Do you have any of the following?", type: "multi", value: "Multi",
        more: [
            { key: "Sleep_impairment", text: "Sleep impairment?", type: "yesno", value: "Yes" },
            { key: "Sleep_apnea", text: "Untreated sleep apnea?", type: "yesno", value: "Yes" },
            { key: "REM_sleep_behaviour_disorder", text: "REM sleep behaviour disorder?", type: "yesno", value: "No" }
        ]
    }
]