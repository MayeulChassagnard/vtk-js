import test from 'tape-catch';
import vtkWarpScalar from '..';
import vtkSphereSource from '../../../Sources/SphereSource';

/* global window */

test('vtkWarpScalar class', (t) => {
  t.ok(vtkWarpScalar, 'Make sure the class definition exist');
  const instance = vtkWarpScalar.newInstance();
  t.ok(instance, 'Make sure the instance exist');
  t.end();
});

test('vtkWarpScalar Defaults', (t) => {
  const instance = vtkWarpScalar.newInstance();

  t.equal(instance.getScaleFactor(), 1, 'Default ScaleFactor should be 1');
  t.equal(instance.getUseNormal(), false, 'Default UseNormal should be false');
  t.equal(instance.getXyPlane(), false, 'Default xyPlane should be false');
  t.deepEqual(instance.getNormal(), [0, 0, 1], 'Default normal should be [0, 0, 1]');

  t.end();
});

test('vtkWarpScalar set/get', (t) => {
  const instance = vtkWarpScalar.newInstance();

  instance.setScaleFactor(2.5);
  t.equal(instance.getScaleFactor(), 2.5, 'Updated value of ScaleFactor should be 2.5');

  t.end();
});


test('vtkWarpScalar execution', (t) => {
  const source = vtkSphereSource.newInstance();
  const filter = vtkWarpScalar.newInstance();
  filter.setInputConnection(source.getOutputPort());
  source.update();
  filter.update();
  const input = source.getOutputData();
  const output = filter.getOutputData();
  t.ok(output, 'Output dataset exist');
  t.equal(output.isA('vtkPolyData'), true, 'The output dataset should be a vtkPolydata');
  t.equal(input.getPoints().getNumberOfTuples(), output.getPoints().getNumberOfTuples(), 'The number of points do not change between input and output');

  t.end();
});

test('vtkWarpScalar rendering', (t) => {
  t.ok(window.takeScreenshot, 'Take screenshot available');

  window.takeScreenshot('/Users/seb/Desktop/phan-test.png');

  t.end();
});
