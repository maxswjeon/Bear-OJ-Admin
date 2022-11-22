import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { UsersResponse } from "types/Responses"

const useUsers = () => {
    return useQuery<UsersResponse>(["users"], async () => {
        const { data } = await axios.get<UsersResponse>(process.env.NEXT_PUBLIC_API_URL + "/admin/users", { withCredentials: true })
        return data;
    })
}

export default useUsers;