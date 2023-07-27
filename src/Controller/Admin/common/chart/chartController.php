<?php

namespace App\Controller\Admin\common\chart;

use App\Entity\Charts;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\UX\Chartjs\Builder\ChartBuilderInterface;
use Symfony\UX\Chartjs\Model\Chart;



class chartController extends AbstractController
{
    private $em;
    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    #[Route('/admin/chart/{type}', name: 'app_admin_common_chart_chart')]
    public function index($type, ChartBuilderInterface $chartBuilder): Response
    {

        $data = [];

        switch ($type) {
            case "morris":
                $title = "Morris";
                break;
            case "line":
                $title = "Line";
                break;
            case "bar":
                $title = "Bar";
                break;
            case "radar":
                $title = "Radar";
                break;
            case "pie":
                $title = "Pie";
                break;
            case "polarArea":
                $title = "PolarArea";
                break;
            case "doughnut":
                $title = "Doughnut";
                break;
            case "bubble":
                $title = "Bubble";
                break;
            case "scatter":
                $title = "Scatter";
                break;
        }
        $data['controller_name'] = 'Chart - ' . $title;

        //findAll() - Select * from charts;
        //find() - Select * from charts WHERE id=5;
        //findAll() - Select * from charts ORDER BY id DESC;
        //findOneBy() - Select * from charts WHERE id=5 AND type = 'line' ORDER BY id DESC;

        $repository = $this->em->getRepository(Charts::class);

        $AllCartsTypeLine = $repository->findBy(['type' => $type], ['id' => 'DESC']);

        foreach ($AllCartsTypeLine as $AllCartTypeLine) {

            $datasets[] = [
                'label' => $AllCartTypeLine->getLabel(),
                'backgroundColor' => $AllCartTypeLine->getColor(),
                'borderColor' => $AllCartTypeLine->getColor(),
                'data' => json_decode($AllCartTypeLine->getData()),
                'fill' => false,
                'tension' => 0.1,
                'type' => $AllCartTypeLine->getType()
            ];
        }

        $charts = $chartBuilder->createChart(Chart::class);


        $charts->setData([
            'labels' => ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
            'datasets' => $datasets
        ]);
        $charts->setOptions([
            'scales' => [
                'y' => [
                    'suggestedMin' => 0,
                    'suggestedMax' => 100,
                ],
            ],
        ]);

        $data['Carts'] = $charts;


        $data['header'] = ($this->forward('App\Controller\Admin\common\headerController::index'))->getContent();

        $data['footer'] = ($this->forward('App\Controller\Admin\common\footerController::index'))->getContent();

        return $this->render('admin/common/chart/chart/index.html.twig', $data);
    }
}
