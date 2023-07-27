<?php

namespace App\Controller\Admin\common\forms;

use App\Entity\ContactForm;
use App\Entity\Forms;
use App\Form\ContactFormType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class formsController extends AbstractController
{
    #[Route('/admin/forms/forms/', name: 'app_admin_common_forms_forms')]
    public function index(): Response
    {


        $form = new ContactForm();
        $form = $this->createForm(ContactFormType::class, $form);

        $data['form'] = $form->createView();


        $data['controller_name'] = 'Form with createForm() and createView()';

        $data['header'] = ($this->forward('App\Controller\Admin\common\headerController::index'))->getContent();

        $data['footer'] = ($this->forward('App\Controller\Admin\common\footerController::index'))->getContent();

        return $this->render('admin/common/forms/forms/index.html.twig', $data);
    }

    #[Route('/admin/forms/type/{forms}', name: 'create_contact')]

    public function create($forms,Request $request): Response
    {
        $data = [];
        $form = new ContactForm();
        //$form = $this->createForm(ContactFormType::class, $form);



        $formContact = $this->createFormBuilder($form)
        ->add('name', ContactFormType::class)
        ->add('save', SubmitType::class, ['label' => 'Submit'])
        ->getForm();
       


        $data['form'] = $formContact;

        $data['controller_name'] = 'Form with createFormBuilder()';

        $data['header'] = ($this->forward('App\Controller\Admin\common\headerController::index'))->getContent();

        $data['footer'] = ($this->forward('App\Controller\Admin\common\footerController::index'))->getContent();


        return $this->render('admin/common/forms/forms/form.twig', $data);
    }
}
