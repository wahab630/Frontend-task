import axios from "axios";

export async function apiRequest<T>(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE" = "POST",
    payload?: any
): Promise<T> {
    const res = await axios({
        url: endpoint, method, ...(method === "GET" ? { params: payload } : { data: payload }),
    });
    return res.data;
}
