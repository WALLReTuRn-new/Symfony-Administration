<?php

namespace App\DataFixtures;

use App\Entity\Charts;
use App\Entity\Users;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $chart = new Charts();
        $chart->setType('line');
        $chart->setLabel('My First dataset');
        $chart->setColor('rgb(255, 99, 132)');
        $chart->setData('[20, 20, 60, 40, 30, 45, 60]');

          $manager->persist($chart);

        $chart2 = new Charts();
        $chart2->setType('line');
        $chart2->setLabel('My Second dataset');
        $chart2->setColor('rgb(56, 202, 179)');
        $chart2->setData('[10, 10, 40, 20, 30, 45, 80]');

         $manager->persist($chart2);

        $chartBar = new Charts();
        $chartBar->setType('bar');
        $chartBar->setLabel('My Bar dataset');
        $chartBar->setColor('rgb(255, 99, 132)');
        $chartBar->setData('[10, 10, 40, 20, 30, 45, 80]');

         $manager->persist($chartBar);

        $chartRadar = new Charts();
        $chartRadar->setType('radar');
        $chartRadar->setLabel('My Radar dataset');
        $chartRadar->setColor('rgb(255, 99, 132)');
        $chartRadar->setData('[10, 10, 40, 20, 30, 45, 80]');

         $manager->persist($chartRadar);

        $chartPie = new Charts();
        $chartPie->setType('pie');
        $chartPie->setLabel('My Pie dataset');
        $chartPie->setColor('rgb(255, 99, 132)');
        $chartPie->setData('[10, 10, 40, 20, 30, 45, 80]');

         $manager->persist($chartPie);

        $chartDoughnut = new Charts();
        $chartDoughnut->setType('doughnut');
        $chartDoughnut->setLabel('My Doughnut dataset');
        $chartDoughnut->setColor('rgb(255, 99, 132)');
        $chartDoughnut->setData('[10, 10, 40, 20, 30, 45, 80]');

          $manager->persist($chartDoughnut);

        $chartPolarArea = new Charts();
        $chartPolarArea->setType('polarArea');
        $chartPolarArea->setLabel('My PolarArea dataset');
        $chartPolarArea->setColor('rgb(255, 99, 132)');
        $chartPolarArea->setData('[10, 10, 40, 20, 30, 45, 80]');

         $manager->persist($chartPolarArea);

        $chartBubble = new Charts();
        $chartBubble->setType('bubble');
        $chartBubble->setLabel('My Bubble dataset');
        $chartBubble->setColor('rgb(255, 99, 132)');
        $chartBubble->setData('[10, 10, 40, 20, 30, 45, 80]');

         $manager->persist($chartBubble);

        $chartScatter = new Charts();
        $chartScatter->setType('scatter');
        $chartScatter->setLabel('My Scatter dataset');
        $chartScatter->setColor('rgb(255, 99, 132)');
        $chartScatter->setData('[10, 10, 40, 20, 30, 45, 80]');

         $manager->persist($chartScatter);


        //Add User
        $users = new Users();
        $users->setUserName('WALLReTuRn');
        $users->setUserFirstName('Plamen');
        $users->setUserLastName('Petrov');
        $users->setUserEmail('wallreturn@gmail.com');
        $users->setUserPassword('123456');
        $users->setUserRole('1');
        $users->setUserStatus('1');
        $users->setUserPhone('77444911111');
        $users->setUserDateAdded(new \DateTime());
        

        $manager->persist($users);


        $manager->flush();
    }
}
