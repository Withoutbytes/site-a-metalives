import React, { ReactNode } from "react";
import Head from "next/head";

type Props = {
	children?: ReactNode;
	title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
	<div className="bg-slate-800 w-full min-h-screen h-full flex flex-col items-center">
		<Head>
			<title>{title}</title>
			<meta charSet="utf-8" />
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
		</Head>
		{children}
	</div>
);

export default Layout;
