<?php

namespace App\Controller\Admin\common;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class headerController extends AbstractController
{
    #[Route('/admin/common/header', name: 'app_admin_common_header')]
    public function index(): Response
    {
        $data = [];
        $data['menu'] = ($this->forward('App\Controller\Admin\common\menuController::index'))->getContent();
        return $this->render('admin/common/header.twig',$data);
    }
}
