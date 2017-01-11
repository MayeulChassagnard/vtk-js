import vtkFullScreenRenderWindow  from '../../../../../Sources/Rendering/Misc/FullScreenRenderWindow';
import vtkCalculator			  from '../../../../../Sources/Filters/General/Calculator';
import vtkActor                   from '../../../../../Sources/Rendering/Core/Actor';
import vtkPlaneSource             from '../../../../../Sources/Filters/Sources/PlaneSource';
import vtkSphereMapper            from '../../../../../Sources/Rendering/Core/SphereMapper';

import { Representation }     from '../../../../../Sources/Rendering/Core/Property/Constants';
import { FieldDataTypes }         from '../../../../../Sources/Common/DataModel/DataSet/Constants';

import controlPanel from './controlPanel.html';

// ----------------------------------------------------------------------------
// Standard rendering code setup
// ----------------------------------------------------------------------------

const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({ background: [0, 0, 0] });
const renderer = fullScreenRenderer.getRenderer();
const renderWindow = fullScreenRenderer.getRenderWindow();

// ----------------------------------------------------------------------------
// Example code
// ----------------------------------------------------------------------------

const planeSource = vtkPlaneSource.newInstance();
const simpleFilter = vtkCalculator.newInstance();
const mapper = vtkSphereMapper.newInstance();
const actor = vtkActor.newInstance();

actor.getProperty().setRepresentation(Representation.WIREFRAME);

simpleFilter.setFormulaSimple(
  FieldDataTypes.POINT, // Generate an output array defined over points.
  [],  // We don't request any point-data arrays because point coordinates are made available by default.
  'temperature', // Name the output array "temperature"
  x => (((x[0] - 0.5) * (x[0] - 0.5)) + ((x[1] - 0.5) * (x[1] - 0.5)) + 0.125) * 0.1
); // Our formula for temperature

// The generated 'temperature' array will become the default scalars, so the plane mapper will color by 'temperature':
simpleFilter.setInputConnection(planeSource.getOutputPort());

mapper.setInputConnection(simpleFilter.getOutputPort());
mapper.setScaleArray('temperature');

actor.setMapper(mapper);

renderer.addActor(actor);
renderer.resetCamera();
renderWindow.render();

// -----------------------------------------------------------
// UI control handling
// -----------------------------------------------------------

fullScreenRenderer.addController(controlPanel);

['xResolution', 'yResolution'].forEach((propertyName) => {
  document.querySelector(`.${propertyName}`).addEventListener('input', (e) => {
    const value = Number(e.target.value);
    planeSource.set({ [propertyName]: value });
    renderWindow.render();
  });
});

// -----------------------------------------------------------
// Make some variables global so that you can inspect and
// modify objects in your browser's developer console:
// -----------------------------------------------------------

global.planeSource = planeSource;
global.mapper = mapper;
global.actor = actor;
global.renderer = renderer;
global.renderWindow = renderWindow;
