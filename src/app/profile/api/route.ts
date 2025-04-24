import { NextRequest } from "next/server";
import { headers, cookies } from "next/headers";

//Headers in route handler
export async function GET(request: NextRequest) {

    const requestHeaders = new Headers(request.headers);
    const headerList = await headers();

    //Cookies in route handler
    (await cookies()).set("resultPerPage", "20");
    const theme = request.cookies.get("theme");

    console.log(requestHeaders.get("Authorization"));
    console.log(headerList.get("Authorization"));

    console.log(theme);
    console.log((await cookies()).get("resultPerPage"));

    return new Response("<h1>Profile API Data</1>", {
        headers: {
            "Content-Type": "text/html",
            "Set-Cookie": "theme=dark"
        },
    });
}