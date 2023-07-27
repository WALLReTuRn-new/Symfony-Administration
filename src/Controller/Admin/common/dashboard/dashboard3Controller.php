<?php

namespace App\Controller\Admin\common\dashboard;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class dashboard3Controller extends AbstractController
{
    #[Route('/admin/dashboard/dashboard-3', name: 'app_admin_common_dashboard_dashboard3')]
    public function index(): Response
    {


        $data = [];

        $data['controller_name'] = 'Dashboard 3';

        $data['header'] = ($this->forward('App\Controller\Admin\common\headerController::index'))->getContent();

        $data['footer'] = ($this->forward('App\Controller\Admin\common\footerController::index'))->getContent();


        return $this->render('admin/common/dashboard/dashboard3/index.html.twig', $data);
    }
}
