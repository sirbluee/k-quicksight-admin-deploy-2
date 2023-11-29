import TableUser from "@/app/admin/user/component/table";
export default function ListUser(){

    return(
        <div>
            <h3 className={'py-3 text-primary-color'}>All user</h3>
            <TableUser />
        </div>
    )
}