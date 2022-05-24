import { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";

const IndexPage = () => {
	const productFrame = useRef<HTMLIFrameElement>()

	const [productUrl, setProductUrl] = useState<string | null>(null)

	// Site A -> Site B
	const onClickProductSku = (sku: string) => {
		setProductUrl(`http://localhost:3001/widgets/product/${sku}`)

		const windowTop = window.top;
		if (!windowTop) return;
		windowTop.postMessage({ type: "ON_CLICK_PRODUCT", sku }, "*");
	};

	// Site B -> Site A
	useEffect(() => {
		window.addEventListener("message", (ev) => {
			console.log(ev.data)

			if (ev.data.type === "HELLO") {
				console.log(ev.data.message);
			}

			if (ev.data.type === "CLOSE_MODAL") {
				setProductUrl(null);
			}
		});
	}, []);

	return (
		<Layout title="Site A Metalives">
			<h1 className="w-full mx-auto my-5 text-2xl font-bold text-center text-orange-500">Site A Metalives</h1>
			<div className="flex flex-col w-full space-y-4">
				{[
					["Picanha ", "6308"],
					["Acerola", "6414"]
				].map(([name, sku]) => (
					<button
						className="px-2 py-1 mx-auto text-white bg-orange-500 rounded-md"
						onClick={() => onClickProductSku(sku)}
						key={sku}
					>
						{name}
					</button>
				))}
			</div>
			{productUrl && (
				<div 
					id="background" 
					className="absolute top-0 left-0 bg-black/40 w-screen h-screen flex items-center justify-center" 
					onClick={(e: any)=>{
						if(e.target.id === "background"){
							setProductUrl(null)
						}
					}}
				>
					<iframe
						className="bg-white w-[22rem] h-[22rem]"
						title="live"
						src={productUrl}
						frameBorder="0"
						ref={productFrame}
					/>
				</div>
			)}
		</Layout>
	);
};

export default IndexPage;
