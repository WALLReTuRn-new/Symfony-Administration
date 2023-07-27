<?php

namespace App\Controller\Admin\common;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class footerController extends AbstractController
{
    #[Route('/admin/common/footer', name: 'app_admin_common_footer')]
    public function index(): Response
    {


        $data = [];

        return $this->render('admin/common/footer.twig', $data);
    }
}
