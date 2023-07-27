<?php

namespace App\Controller\Admin\users;

use App\Entity\Users;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class userslistController extends AbstractController
{

    private $em;
    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    #[Route('/admin/users/userslist', name: 'app_admin_users_userslist')]
    public function index(): Response
    {

        $data = [];

        //findAll() - Select * from users;
        //find() - Select * from users WHERE id=5;
        //findAll() - Select * from users ORDER BY id DESC;
        //findOneBy() - Select * from users WHERE id=5 AND type = 'line' ORDER BY id DESC;

        $repository = $this->em->getRepository(Users::class);

        $users = $repository->findAll(['status' => 1], ['id' => 'DESC']);

        $data['users'] = [];
        $count = 1;
        foreach ($users as $user) {

            $data['users'][] = [
                'number' => $count++,
                'userId' => $user->getId(),
                'userName' => $user->getUserName(),
                'userFirstLastName' => $user->getUserFirstName() . ' - ' . $user->getUserLastName(),
                'userEmail' => $user->getUserEmail(),
                'userRole' => $user->getUserRole(),
                'userStatus' => ($user->getUserStatus() == 1) ? 'Active' : 'Inactive',
                'userEdit' => '/admin/users/adduser/edit&user_id=' . $user->getId(),
                'userDelete' => ''
            ];
        }



        $data['header'] = ($this->forward('App\Controller\Admin\common\headerController::index'))->getContent();

        $data['footer'] = ($this->forward('App\Controller\Admin\common\footerController::index'))->getContent();
        return $this->render('admin/users/userslist.twig', $data);
    }
}
