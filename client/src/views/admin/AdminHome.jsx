import { HomeGridAdmin } from "../../components/admin/HomeGridAdmin"
import { ClientsView } from "./ClientsView"

export const AdminHome = () => {
    const clients = [
        {
            name: "Nombre bastante largo",
            status: "active",
            country: "Argentina"
        },
        {
            name: "etcetcetc",
            status: "active",
            country: "Argentina"
        },
        {
            name: "otr nombre",
            status: "active",
            country: "Argentina"
        },
        {
            name: "burguer king",
            status: "inactive",
            country: "Argentina"
        },
        {
            name: "taco bells",
            status: "active",
            country: "Argentina"
        },
        {
            name: "KFC",
            status: "inactive",
            country: "Argentina"
        },
    ]

    return (<>
        {/* <HomeGridAdmin /> */}
        <ClientsView clients={clients}/>
    </>)
}