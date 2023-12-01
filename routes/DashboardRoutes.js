import { v4 as uuid } from 'uuid';

export const DashboardMenu = [
	{
		id: uuid(),
		title: 'Panel Principal',
		icon: 'home',
		link: '/'
	},
	{
		id: uuid(),
		title: 'Administración',
		grouptitle: true
	},
	{
		id: uuid(),
		title: 'Solicitudes',
		icon: 'layers',
		children: [
			{ id: uuid(), link: '/pages/formEquipos', name: 'Registrar Solicitud' },
			{ id: uuid(), link: '/pages/solicitudes', name: 'Solicitudes'},
		]
	},
	{
		id: uuid(),
		title: 'Equipo',
		icon: 'layers',
		children: [
			{ id: uuid(), link: '/pages/formEquipo', name: 'Registrar Equipo' },
			{ id: uuid(), link: '/pages/equipos', name: 'Equipos'},
		]
	},
	{
		id: uuid(),
		title: 'Perfil',
		icon: 'user',
		link: '/pages/settings'
	}
];

export default DashboardMenu;
