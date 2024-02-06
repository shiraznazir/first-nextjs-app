export default function UserProfile({params}: any){
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-2">
            <h1 className="my-2">Profile</h1>
            <h1>Profile Page <span className="bg-orange-500 my-2 rounded-lg text-white p-2">{params.id}</span></h1>
        </div>
    )
}