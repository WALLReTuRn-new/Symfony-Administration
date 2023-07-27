<?php

namespace App\Controller\Admin\common;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class dashboardController extends AbstractController
{
    #[Route('/admin', name: 'app_admin_common_dashboard')]
    public function index(): Response
    {

        $data = [];

        $data['header'] = ($this->forward('App\Controller\Admin\common\headerController::index'))->getContent();
        
        $data['footer'] = ($this->forward('App\Controller\Admin\common\footerController::index'))->getContent();





        return $this->render('admin/common/dashboard.twig',$data);
    }
}
