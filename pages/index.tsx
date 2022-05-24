import { useEffect } from "react";
import Layout from "../components/Layout";

const IndexPage = () => {
	// Site A -> Site B
	const onClickProductSku = (sku: string) => {
		const windowTop = window.top;
		if (!windowTop) return;
		windowTop.postMessage({ type: "ON_CLICK_PRODUCT", sku }, "*");
	};

	// Site B -> Site A
	useEffect(() => {
		window.addEventListener("message", (ev) => {
			if (ev.data.type === "HELLO") {
				console.log(ev.data.message);
			}
		});
	}, []);

	return (
		<Layout title="Site A Metalives">
			<h1 className="w-full mx-auto my-5 text-2xl font-bold text-center text-orange-500">Site A Metalives</h1>
			<div className="flex flex-col w-full space-y-4">
				{[
					["Maçã ", "apple"],
					["Banana", "banana"],
					["Melancia", "melon"],
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
		</Layout>
	);
};

export default IndexPage;
