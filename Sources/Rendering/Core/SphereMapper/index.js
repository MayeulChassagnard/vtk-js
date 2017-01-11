import * as macro                                 from '../../../macro';
import vtkMapper                                  from '../Mapper';

export function vtkSphereMapper(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('vtkSphereMapper');
}


// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

const DEFAULT_VALUES = {
  scaleArray: null,
  radius: 0.05,
};

// ----------------------------------------------------------------------------

export function extend(publicAPI, model, initialValues = {}) {
  Object.assign(model, DEFAULT_VALUES, initialValues);

  // Inheritance
  vtkMapper.extend(publicAPI, model, initialValues);

  macro.setGet(publicAPI, model, [
    'scaleArray',
    'radius',
  ]);

  // Object methods
  vtkSphereMapper(publicAPI, model);
}

// ----------------------------------------------------------------------------

export const newInstance = macro.newInstance(extend, 'vtkSphereMapper');

// ----------------------------------------------------------------------------

export default { newInstance, extend };

