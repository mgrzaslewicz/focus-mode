/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { FocusedTaskComponent } from './focused-task.component';

describe('Component: FocusedTask', () => {
  it('should create an instance', () => {
    let component = new FocusedTaskComponent();
    expect(component).toBeTruthy();
  });
});
