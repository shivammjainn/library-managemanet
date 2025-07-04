import Image from "next/image"
export default function Logo() {
    return (
        <div className="logo border-b-1 border-gray-300 flex justify-center">
            <Image
                src="https://i.pinimg.com/736x/8e/50/3d/8e503dedd73f2eb2e6ebc871863c33f9.jpg"
                alt="Library Logo"
                height={10}
                width={180}
                className="h-14"
            />
        </div>
    );
}