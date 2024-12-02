import React from "react";
import { Link } from "react-router-dom";

const NotFoudPage = () => {
	return (
		<div>
			<h1>404</h1>
			<h2>Not found</h2>
			<Link to="/admin">Go to dashboard</Link>
		</div>
	);
};

export default NotFoudPage;
