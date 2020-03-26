import { Icon } from '../interfaces/Icon';
import { IconNames } from './iconNames';

import { default as disk } from './../../../images/30/disk.png';
import { default as diskActive } from './../../../images/30/disk-active.png';
import { default as multiView } from './../../../images/30/MultiView.png';
import { default as multiViewActive } from './../../../images/30/MultiView-active.png';
import { default as osDraw } from './../../../images/30/os3-1-4_draw.png';
import { default as osDrawActive } from './../../../images/30/os3-1-4_draw-active.png';
import { default as serial } from './../../../images/30/Serial.png';
import { default as serialActive } from './../../../images/30/Serial-active.png';
import { default as setMap } from './../../../images/30/SetMap.png';
import { default as setMapActive } from './../../../images/30/SetMap-active.png';
import { default as workbench } from './../../../images/30/Workbench.png';
import { default as workbenchActive } from './../../../images/30/Workbench-active.png';

export const desktopIcons: Icon[] = [
	{
		icon: disk,
		iconActive: diskActive,
		left: 45,
		title: IconNames.AboutUs,
		top: 60,
	},
	{
		icon: osDraw,
		iconActive: osDrawActive,
		left: 45,
		title: IconNames.Start,
		top: 130,
	},
	{
		icon: workbench,
		iconActive: workbenchActive,
		left: 15,
		title: IconNames.Current,
		top: 220,
	},
	{
		icon: multiView,
		iconActive: multiViewActive,
		left: 15,
		title: IconNames.Previous,
		top: 335,
	},
	{
		icon: serial,
		iconActive: serialActive,
		left: 30,
		title: IconNames.Contact,
		top: 425,
	},
	{
		icon: setMap,
		iconActive: setMapActive,
		left: 45,
		title: IconNames.Links,
		top: 515,
	},
];
