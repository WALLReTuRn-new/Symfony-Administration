<?php

namespace App\Controller\Admin\common\dashboard;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class dashboard2Controller extends AbstractController
{
    #[Route('/admin/dashboard/dashboard-2', name: 'app_admin_common_dashboard_dashboard2')]
    public function index(): Response
    {
        


        $data = [];

        $data['controller_name'] = 'Dashboard 2';

        $data['header'] = ($this->forward('App\Controller\Admin\common\headerController::index'))->getContent();
        
        $data['footer'] = ($this->forward('App\Controller\Admin\common\footerController::index'))->getContent();


        return $this->render('admin/common/dashboard/dashboard2/index.html.twig', $data);
    }
}
