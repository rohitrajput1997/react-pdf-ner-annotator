import React from 'react';
import Tooltip from './Tooltip';

interface Props {
	loading: boolean;
	error?: string;
	message?: string;
}

const OcrInfo = ({ loading, error, message }: Props) => {
	if (loading) {
		return (
			<Tooltip message="OCR is running...">
				{/* <img src={arrowRepeat} className="ocr-info__icon ocr-info__icon-rotate" alt="loading icon" /> */}
			</Tooltip>
		);
	}

	if (error) {
		return (
			<Tooltip message={error}>
				{/* <img src={exclamationCircle} className="ocr-info__icon" alt="error icon" /> */}
			</Tooltip>
		);
	}

	if (message) {
		return (
			<Tooltip message={message}>
				{/* <img src={checkCircle} className="ocr-info__icon" alt="check icon" /> */}
			</Tooltip>
		);
	}

	return null;
};

export default OcrInfo;
