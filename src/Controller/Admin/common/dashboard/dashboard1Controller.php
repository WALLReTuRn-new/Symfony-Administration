<?php

namespace App\Controller\Admin\common\dashboard;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class dashboard1Controller extends AbstractController
{
    #[Route('/admin/dashboard/dashboard-1', name: 'app_admin_common_dashboard_dashboard1')]
    public function index(): Response
    {

        $data = [];

        $data['controller_name'] = 'Dashboard 1';

        $data['header'] = ($this->forward('App\Controller\Admin\common\headerController::index'))->getContent();
        
        $data['footer'] = ($this->forward('App\Controller\Admin\common\footerController::index'))->getContent();


        return $this->render('admin/common/dashboard/dashboard1/index.html.twig', $data);
    }
}
