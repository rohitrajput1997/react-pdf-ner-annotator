import React, { useContext, useMemo } from 'react';
import AnnotationContext from '../../context/annotationContext';
import AreaMark from './AreaMark';

interface Props {
	pdfScale: number;
	pageNumber: number;
}

const AreaLayer = ({ pdfScale, pageNumber }: Props) => {
	const context = useContext(AnnotationContext);

	const annotations = useMemo(() => {
		return context.annotations?.filter((annotation) => !!annotation.areaAnnotation && annotation.page === pageNumber);
	}, [context, pageNumber]);

	return (
		<>
			{annotations?.map((annotation) => (
				<AreaMark
					pdfScale={pdfScale}
					key={annotation.id}
					annotation={annotation}
					removeAnnotation={context.removeAnnotation}
					updateAnnotation={context.updateAnnotation}
				/>
			))}
		</>
	);
};

export default AreaLayer;
