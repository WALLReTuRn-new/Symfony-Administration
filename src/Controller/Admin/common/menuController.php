<?php

namespace App\Controller\Admin\common;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class menuController extends AbstractController
{
    #[Route('/admin/common/menu', name: 'app_admin_common_menu')]
    public function index()
    {
        // return $this->render('admin/common/menu.twig', [
        //     'controller_name' => 'menuController',
        // ]);


        // Menu

        $dashboard[] = [
            'name' => 'Dashboard-1',
            'href' => '/admin/dashboard/dashboard-1',

        ];
        $dashboard[] = [
            'name' => 'Dashboard-2',
            'href' => '/admin/dashboard/dashboard-2',

        ];
        $dashboard[] = [
            'name' => 'Dashboard-3',
            'href' => '/admin/dashboard/dashboard-3',

        ];
        $data['menus'][] = [
            'id' => 'menu-dashboard',
            'icon' => '<svg xmlns="http://www.w3.org/2000/svg" class="side-menu__icon" width="24" height="24" viewbox="0 0 24 24"><path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm7 7v-5h4v5h-4zm2-15.586 6 6V15l.001 5H16v-5c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H6v-9.586l6-6z"></path></svg>',
            'name' => 'Dashboard',
            'href' => 'dashboard',
            'children' => $dashboard
        ];
        //  $app [] = [
        //   'name' => 'Cards',
        //   'href' => 'cards',

        //];
        // $data['menus'][] = [
        //     'id' => 'menu-app',
        //    'icon' => '<i class="mdi mdi-gauge"></i>',
        //    'name' => 'APP',
        //    'href' => 'app',
        //    'children' => $app
        // ];



        // $elements [] = [
        //    'name' => 'Alerts',
        //    'href' => 'alerts',

        // ];
        // $data['menus'][] = [
        //    'id' => 'menu-elements',
        //    'icon' => '<i class="mdi mdi-gauge"></i>',
        //    'name' => 'Elements',
        //     'href' => 'elements',
        //     'children' => $elements
        // ];






        $charts[] = [
            'name' => 'Charts Lines',
            'href' => '/admin/chart/line',

        ];
        $charts[] = [
            'name' => 'Charts Bar',
            'href' => '/admin/chart/bar',

        ];
        $charts[] = [
            'name' => 'Charts Radar',
            'href' => '/admin/chart/radar',

        ];
        $charts[] = [
            'name' => 'Charts Pie',
            'href' => '/admin/chart/pie',

        ];
        $charts[] = [
            'name' => 'Charts Doughnut',
            'href' => '/admin/chart/doughnut',

        ];
        $charts[] = [
            'name' => 'Charts PolarArea',
            'href' => '/admin/chart/polarArea',

        ];
        $charts[] = [
            'name' => 'Charts Bubble',
            'href' => '/admin/chart/bubble',

        ];
        $charts[] = [
            'name' => 'Charts Scatter',
            'href' => '/admin/chart/scatter',

        ];

        $data['menus'][] = [
            'id' => 'menu-elements',
            'icon' => '<svg xmlns="http://www.w3.org/2000/svg" class="side-menu__icon" width="24" height="24" viewBox="0 0 24 24"><path d="M20 7h-4V4c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H4c-1.103 0-2 .897-2 2v9a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V9c0-1.103-.897-2-2-2zM4 11h4v8H4v-8zm6-1V4h4v15h-4v-9zm10 9h-4V9h4v10z"></path></svg>',
            'name' => 'Charts',
            'href' => 'charts',
            'children' => $charts
        ];


        $forms[] = [
            'name' => 'Forms',
            'href' => '/admin/forms/forms',

        ];
        $forms[] = [
            'name' => 'Forms Create',
            'href' => '/admin/forms/type/create',

        ];

        $data['menus'][] = [
            'id' => 'menu-form',
            'icon' => '<svg xmlns="http://www.w3.org/2000/svg" class="side-menu__icon" width="24" height="24" viewBox="0 0 24 24"><path d="M19.937 8.68c-.011-.032-.02-.063-.033-.094a.997.997 0 0 0-.196-.293l-6-6a.997.997 0 0 0-.293-.196c-.03-.014-.062-.022-.094-.033a.991.991 0 0 0-.259-.051C13.04 2.011 13.021 2 13 2H6c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V9c0-.021-.011-.04-.013-.062a.99.99 0 0 0-.05-.258zM16.586 8H14V5.414L16.586 8zM6 20V4h6v5a1 1 0 0 0 1 1h5l.002 10H6z"></path></svg>',
            'name' => 'Forms',
            'href' => 'forms',
            'children' => $forms
        ];





        $users[] = [
            'name' => 'Add Users',
            'href' => '/admin/users/adduser',

        ];
        $users[] = [
            'name' => 'Users List',
            'href' => '/admin/users/userslist',

        ];

        $data['menus'][] = [
            'id' => 'menu-user',
            'icon' => '<svg xmlns="http://www.w3.org/2000/svg" class="side-menu__icon" width="24" height="24" viewBox="0 0 20 20">
            <g id="developer" transform="translate(0.25)">
              <path id="Path_1667" data-name="Path 1667" d="M8.006,8.011a4.006,4.006,0,1,1,4.006-4.006A4.01,4.01,0,0,1,8.006,8.011Zm0-6.81a2.8,2.8,0,1,0,2.8,2.8A2.807,2.807,0,0,0,8.006,1.2Z" transform="translate(-0.845)" fill="#000000"/>
              <path id="Path_1668" data-name="Path 1668" d="M7.04,19.611H.351a.6.6,0,0,1-.6-.6v-3.2A3.81,3.81,0,0,1,3.555,12h7.21a3.784,3.784,0,0,1,2.968,1.419.6.6,0,0,1-.937.753,2.587,2.587,0,0,0-2.031-.969H3.555a2.607,2.607,0,0,0-2.6,2.6v2.6H7.04a.6.6,0,0,1,0,1.2Z" transform="translate(0 -2.386)" fill="#000000"/>
              <path id="Path_1669" data-name="Path 1669" d="M16.441,20.711a.414.414,0,0,1-.1-.012.442.442,0,0,1-.332-.529l.883-3.828a.442.442,0,0,1,.861.2l-.883,3.828A.441.441,0,0,1,16.441,20.711Z" transform="translate(-5.109 -2.332)" fill="#000000"/>
              <path id="Path_1670" data-name="Path 1670" d="M20.442,20.534a.442.442,0,0,1-.3-.77l1.108-1-1.108-1a.442.442,0,1,1,.591-.657l1.472,1.325a.443.443,0,0,1,0,.657l-1.472,1.325a.441.441,0,0,1-.3.113Z" transform="translate(-6.754 -2.744)" fill="#000000"/>
              <path id="Path_1671" data-name="Path 1671" d="M12.914,20.534a.441.441,0,0,1-.3-.113L11.146,19.1a.443.443,0,0,1,0-.657l1.472-1.325a.442.442,0,1,1,.591.657l-1.108,1,1.108,1a.442.442,0,0,1-.3.77Z" transform="translate(-3.054 -2.744)" fill="#000000"/></g></svg>',
            'name' => 'Users',
            'href' => 'users',
            'children' => $users
        ];




        return $this->render('admin/common/menu.twig', $data);
    }
}
