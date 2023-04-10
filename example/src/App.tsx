import { useRef, useState } from 'react';
import { JSONTree } from 'react-json-tree';
import Annotator from 'react-pdf-ner-annotator';
import { Annotation } from 'react-pdf-ner-annotator/src/interfaces/annotation';
import { Entity, IEntityHover } from 'react-pdf-ner-annotator/src/interfaces/entity';
import 'react-pdf-ner-annotator/src/scss/style.scss';
import { AnnotatorHandle } from 'react-pdf-ner-annotator/src/types';
import './App.scss';
import KlassifaiLogo from './klassifai.svg';
import PDFFile from './pdfs/order.pdf';

const defaultAnnotations: Array<Annotation> = [];

const entities: Array<Entity> = [
  {
    id: 1,
    name: 'Location',
    color: '#4DD0E1',
    entityType: 'NER',
  },
  {
    id: 2,
    name: 'Person',
    color: '#4DB6AC',
    entityType: 'NER',
  },
  {
    id: 3,
    name: 'Organisation',
    color: '#81C784',
    entityType: 'NER',
  },
  {
    id: 4,
    name: 'Date',
    color: '#AED581',
    entityType: 'NER',
  },
  {
    id: 5,
    name: 'Reference',
    color: '#DCE775',
    entityType: 'NER',
  },
  {
    id: 6,
    name: 'Other',
    color: '#FF8A65',
    entityType: 'NER',
  },
  {
    id: 7,
    name: 'Logo',
    color: '#b39ddb',
    entityType: 'AREA',
  },
];

const App = () => {
  const [selectedEntity, setSelectedEntity] = useState(-1);
  const [annotations, setAnnotations] = useState<Array<Annotation>>([]);
  const [textMap, setTextMap] = useState<any>([]);
  const [hoveredEntities, setHoveredEntities] = useState<Array<IEntityHover>>([]);
  const childRef = useRef<AnnotatorHandle<typeof Annotator>>();

  const handleEnter = (entityId: number) => {
    setHoveredEntities((prev) => [...prev, { id: entityId }]);
  };

  const handleLeave = (entityId: number) => {
    setHoveredEntities((prev) => [...prev].filter((entity) => entity.id !== entityId));
  }

  return (
    <div className="app-container">
      <div className="app__header">
        <h1>React PDF NER Annotator</h1>
      </div>
      <div className="app__content">
        <div className="app__content-wrapper">
          <div className="app__content-output">
            <JSONTree data={{
              annotations,
              textMap,
            }}
            />
          </div>
          <div className="app__content-main">
            <Annotator
              data={PDFFile}
              defaultAnnotations={defaultAnnotations}
              entity={entities[selectedEntity]}
              hoveredEntities={hoveredEntities}
              getAnnotations={setAnnotations}
              // getTextMaps={setTextMap}
              ref={childRef}
              config={{
                shouldUpdateDefaultAnnotations: true,
                hideAnnotateableBoxes: true,
                // disableOCR: true,
            }}
              // tokenizer={new RegExp(/[^ \s]/g)}
            />
          </div>
          <div className="app__content-entities">
            <h1>Entities</h1>
            {
              entities.map((entity, index) => (
                <div
                  className="entity-container"
                  key={entity.id}
                  // onMouseEnter={() => handleEnter(entity.id)}
                  // onMouseLeave={() => handleLeave(entity.id)}
                >
                  <span className="entity__hotkey">
                    {index + 1}
                  </span>
                  <span
                    role="button"
                    className="entity__name"
                    style={(selectedEntity === index || selectedEntity === -1) ?
                      { backgroundColor: entity.color } : { backgroundColor: '#bebebe' }}
                    onClick={() => setSelectedEntity(selectedEntity !== index ? index : -1)}
                  >
                    {entity.name}
                  </span>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <div className="app__footer">
        <h1>Made by</h1>
        <a href="https://www.klassif.ai/">
          <img
            className="app__footer-logo"
            src={KlassifaiLogo}
            alt="Klassif.ai logo"/>
        </a>
      </div>
    </div>
  );
};

export default App;
