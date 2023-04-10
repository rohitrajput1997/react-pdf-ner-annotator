import React from 'react';

interface Props {
	showInput: boolean;
	setShowInput: (showInput: boolean) => void;
}

const AreaAnnotationToggle = ({ showInput, setShowInput }: Props) => {
	return (
		<img
			// src={showInput ? eye : eyeSlash}
			alt="Toggle button"
			className="area-annotation__toggle-icon"
			onClick={(event) => {
				event.stopPropagation();
				setShowInput(!showInput);
			}}
		/>
	);
};

export default AreaAnnotationToggle;
