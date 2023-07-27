<?php

namespace App\Controller\Admin\users;

use App\Entity\Users;
use App\Form\AddUserType;
use App\Repository\UsersRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Routing\Annotation\Route;

class adduserController extends AbstractController
{

    private $em;
    private $repo;
    public function __construct(EntityManagerInterface $em, UsersRepository $repo)
    {
        $this->em = $em;
        $this->repo = $repo;
    }
    #[Route('/admin/users/adduser', name: 'app_admin_users_adduser')]
    public function index(Request $request): Response
    {
        $data = [];

        $data['form'] = $this->form($user_id = 0, $request);

        $data['header'] = ($this->forward('App\Controller\Admin\common\headerController::index'))->getContent();

        $data['footer'] = ($this->forward('App\Controller\Admin\common\footerController::index'))->getContent();

        return $this->render('admin/users/adduser.twig', $data);
    }
    #[Route('/admin/users/adduser/edit&user_id={user_id}', name: 'EditUser')]
    public function edit($user_id, Request $request)
    {

        $data = [];

        $data['form'] = $this->form($user_id, $request);

        $data['header'] = ($this->forward('App\Controller\Admin\common\headerController::index'))->getContent();

        $data['footer'] = ($this->forward('App\Controller\Admin\common\footerController::index'))->getContent();

        return $this->render('admin/users/edituser.twig', $data);
    }


    public function form($user_id, Request $request)
    {
        $data = [];
        $form = new Users();
        $form = $this->em->getRepository(Users::class)->find($user_id);
        $form = $this->createForm(AddUserType::class, $form, ($user_id !== 0) ? ['action' => '/admin/users/adduser/save&user_id=' . $user_id] : ['action' => '/admin/users/adduser/save&user_id=0']);

        $data['form'] = $form->createView();

        $template =  $this->render('admin/users/userForm.twig', $data);
        return $template->getContent();
    }
    #[Route('/admin/users/adduser/save&user_id={user_id}', methods: ['POST'], name: 'saveForm')]
    public function save($user_id, Request $request)
    {

        $json = [];
        $UsersUpdate = $this->repo->find($user_id);
        parse_str($request->getContent(), $postData);


        // if ((strlen($postData['add_user']['userName']) < 1) || (strlen($postData['add_user']['userName']) > 10)) {
        //     $json['error']['userName'] = 'Need Username Lenght between 1 and 10 charters';
        //   }
        //
        if ((strlen($postData['add_user']['userFirstName']) < 1) || (strlen($postData['add_user']['userFirstName']) > 32)) {
            $json['error']['userFirstName'] = 'Need Username Lenght between 1 and 32 charters';
        }

        if ((strlen($postData['add_user']['userLastName']) < 1) || (strlen($postData['add_user']['userLastName']) > 32)) {
            $json['error']['userLastName'] = 'Need Username Lenght between 1 and 32 charters';
        }

        if ((strlen($postData['add_user']['userEmail']) > 96) || !filter_var($postData['add_user']['userEmail'], FILTER_VALIDATE_EMAIL)) {
            $json['error']['userEmail'] = 'Incorect Email';
        }

        if ((strlen($postData['add_user']['userPhone']) < 1) || (strlen($postData['add_user']['userPhone']) > 32)) {
            $json['error']['userPhone'] = 'Please Add Phone';
        }

        if ($postData['add_user']['userStatus']) {
            $userStatus = $postData['add_user']['userStatus'];
        } else {
            $userStatus = 0;
        }
        if ($postData['add_user']['userRole']) {
            $userRole = $postData['add_user']['userRole'];
        } else {
            $userRole = 0;
        }

        if (isset($json['error'])) {
            $json['text'] = 'Warning: Please check the form carefully for errors!';
        }



        if (!$json) {
            if ($user_id) {
                $UsersUpdate->setUserName($postData['add_user']['userName']);
                $UsersUpdate->setUserName($postData['add_user']['userName']);
                $UsersUpdate->setUserFirstName($postData['add_user']['userFirstName']);
                $UsersUpdate->setUserLastName($postData['add_user']['userLastName']);
                $UsersUpdate->setUserEmail($postData['add_user']['userEmail']);
                $UsersUpdate->setUserPassword($postData['add_user']['userPassword']);
                $UsersUpdate->setUserRole($userRole);
                $UsersUpdate->setUserStatus($userStatus);
                $UsersUpdate->setUserPhone($postData['add_user']['userPhone']);
                $UsersUpdate->setDateModified(new \DateTime());
                $this->em->flush();
                $json['success'] = 'User Update!';
            } else {
                $users = new Users();
                $users->setUserName($postData['add_user']['userName']);
                $users->setUserFirstName($postData['add_user']['userFirstName']);
                $users->setUserLastName($postData['add_user']['userLastName']);
                $users->setUserEmail($postData['add_user']['userEmail']);
                $users->setUserPassword($postData['add_user']['userPassword']);
                $users->setUserRole($userRole);
                $users->setUserStatus($userStatus);
                $users->setUserPhone($postData['add_user']['userPhone']);
                $users->setUserDateAdded(new \DateTime());
                $this->em->persist($users);
                $this->em->flush();
                $json['success'] = 'User Added!';
            }
        }


        return $this->json($json);
    }
}
