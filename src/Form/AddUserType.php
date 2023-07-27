<?php

namespace App\Form;

use App\Entity\Users;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\TextType;

class AddUserType extends AbstractType
{
    public $getStatus;
    public $getRole;
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
       $entity = $builder->getData();
       $this->getStatus = $entity->getUserStatus();
       $this->getRole = $entity->getUserRole();

       
      
        $builder
            
            ->add('userName', TextType::class, [
                'attr' => [
                    'class' => '',
                    'placeholder' => 'Enter UserName'
                ]

            ])
            ->add('userFirstName', TextType::class, [
                'attr' => [
                    'class' => '',
                    'placeholder' => 'Enter FirstName'
                ]

            ])
            ->add('userLastName', TextType::class, [
                'attr' => [
                    'class' => '',
                    'placeholder' => 'Enter LastName'
                ]

            ])
            ->add('userEmail', TextType::class, [
                'attr' => [
                    'class' => '',
                    'placeholder' => 'Enter Email'
                ]

            ])
            ->add('userPhone', TextType::class, [
                'attr' => [
                    'class' => '',
                    'placeholder' => 'Enter Phone'
                ]

            ])
            ->add('userPassword', TextType::class, [
                'attr' => [
                    'class' => '',
                    'placeholder' => 'Enter Password'
                ]

            ])
            ->add('userRole', ChoiceType::class, [
                'choices' => [
                    'Enable' => 1,
                    'Disable' => 0,
                ],
                'data' => $this->getRole ? $this->getRole : 0,
                'attr' => [
                    'class' => '',
                    'placeholder' => 'Enter UserRole'
                ]

            ])
            ->add('userDateAdded', DateTimeType::class, [
                'attr' => [
                    'class' => '',
                    'placeholder' => 'Enter UserName'
                ]

            ])
            ->add('userStatus', ChoiceType::class, [
                'choices' => [
                    'Enable' => 1,
                    'Disable' => 0,
                ],
                'data' => $this->getStatus ? $this->getStatus : 0,
                'attr' => [
                    'class' => '',
                    'placeholder' => 'Enter UserStatus'
                ]

            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Users::class,
            
        ]);
    }
}
