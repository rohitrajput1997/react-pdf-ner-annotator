import React from 'react';

interface Props {
	message?: string;
}

const Error = ({ message = 'Something went wrong.' }: Props) => {
	return (
		<div className="error-container">
			{/* <img className="error-image" src={errorVisual} alt="Error" /> */}
			<span className="error-message">{message}</span>
		</div>
	);
};

export default Error;
