import { API } from "@/lib/constants";

export async function apiGet<T>(endpoint: string): Promise<T> {

    const response = await fetch(

        `${API.BASE_URL}${endpoint}`

    );

    if (!response.ok) {

        throw new Error(

            "Unable to fetch data."

        );

    }

    return response.json();

}