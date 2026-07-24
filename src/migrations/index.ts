import * as migration_20260720_115305_initial from './20260720_115305_initial';
import * as migration_20260721_073000_add_logo_dark from './20260721_073000_add_logo_dark';
import * as migration_20260721_092917_add_project_tech_stack from './20260721_092917_add_project_tech_stack';
import * as migration_20260724_083314_redesign_updates from './20260724_083314_redesign_updates';

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
    name: '20260721_092917_add_project_tech_stack',
  },
  {
    up: migration_20260724_083314_redesign_updates.up,
    down: migration_20260724_083314_redesign_updates.down,
    name: '20260724_083314_redesign_updates'
  },
];
