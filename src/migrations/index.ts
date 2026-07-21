import * as migration_20260720_115305_initial from './20260720_115305_initial';
import * as migration_20260721_073000_add_logo_dark from './20260721_073000_add_logo_dark';
import * as migration_20260721_092917_add_project_tech_stack from './20260721_092917_add_project_tech_stack';

export const migrations = [
  {
    up: migration_20260720_115305_initial.up,
    down: migration_20260720_115305_initial.down,
    name: '20260720_115305_initial',
  },
  {
    up: migration_20260721_073000_add_logo_dark.up,
    down: migration_20260721_073000_add_logo_dark.down,
    name: '20260721_073000_add_logo_dark',
  },
  {
    up: migration_20260721_092917_add_project_tech_stack.up,
    down: migration_20260721_092917_add_project_tech_stack.down,
    name: '20260721_092917_add_project_tech_stack'
  },
];
