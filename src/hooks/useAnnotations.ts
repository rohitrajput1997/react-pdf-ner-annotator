import { useState, useCallback, useEffect } from 'react';
import { Annotation, AnnotationParams } from '../interfaces/annotation';

const useAnnotations = (defaultAnnotations: Array<Annotation>, readonly: boolean) => {
  const [annotations, setAnnotations] = useState<Array<Annotation>>(defaultAnnotations);

  useEffect(() => {
    setAnnotations(defaultAnnotations);
  }, [defaultAnnotations]);

  const getAnnotationsForPage = useCallback((page: number): Array<Annotation> => {
    return annotations.filter((annotation: Annotation) => annotation.page === page);
  }, [annotations]);

  const addAnnotation = useCallback((annotation: AnnotationParams) => {
    if (readonly) {
      return;
    }

    const lastId = annotations[annotations.length - 1]?.id || 0;
    const newAnnotation: Annotation = {
      id: lastId + 1,
      ...annotation
    };
    const newAnnotations = [...annotations, newAnnotation];
    setAnnotations(newAnnotations);
  }, [annotations]);

  const updateAnnotation = useCallback((annotation: Annotation) => {
    if (readonly) {
      return;
    }

    const indexToUpdate  = annotations.findIndex(x => x.id === annotation.id);
    if (indexToUpdate !== -1) {
      const updatedAnnotations = [...annotations];
      updatedAnnotations[indexToUpdate] = annotation;
      setAnnotations(updatedAnnotations);
    }
  }, [annotations]);

  const removeAnnotation = useCallback((id: number) => {
    if (readonly) {
      return;
    }

    const index = annotations.findIndex(a => a.id === id);
    if (index !== -1) {
      setAnnotations(annotations.filter((_, i) => i !== index));
    }
  }, [annotations]);

  return { annotations, getAnnotationsForPage, addAnnotation, updateAnnotation, removeAnnotation };
};

export default useAnnotations;
