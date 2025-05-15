"use client"
import { Fragment, useEffect, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import CalendarFormEvent from '../appointment/CalendarFormEvent';
import EditCalendarFormEvent from '../appointment/EditCalendarFormEvent';
import { Appointment } from '@/src/schemas';

const componentsMap = {
  "AddCalendar": CalendarFormEvent,
  "EditCalendar": EditCalendarFormEvent,
  //"EditExpense": EditExpenseForm,
  //"DeleteExpense": DeleteExpenseForm
}

export default function ModalContainer() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const showModal = searchParams.get('showModal')

  const [appointment, setAppointment] = useState<Appointment>()

  const show = showModal ? true : false

  const addCalendar = searchParams.get('addCalendar')
  const editCalendar = searchParams.get('editCalendar')
  const appointmentId = searchParams.get('appointmentId')

  //console.log('Appointmend Edit', appointmentId)

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_URL}/admin/api/appointment/id/${appointmentId}`
    fetch(url)
      .then(async (res) => {
        if (!res.ok) {
          console.error('Error en la respuesta del servidor:', res.status);
          return null;
        }
        try {
          return await res.json();
        } catch (e) {
          console.error('Error al parsear JSON:', e);
          return null;
        }
      })
      .then((data) => {
        const cleaned = {
          ...data,
          date: data.date?.split('T')[0]
        };
        setAppointment(cleaned);
      });
  }, [appointmentId])

  //console.log(appointment)
  //const deleteExpense = searchParams.get('deleteExpenseId')

  const getComponentName = () => {
    if (addCalendar) return "AddCalendar"
    if (editCalendar) return "EditCalendar"
    //if(editExpense) return "EditExpense"
    //if(deleteExpense) return "DeleteExpense"
  }

  const componentName = getComponentName()
  const ComponentToRender = componentName ? componentsMap[componentName] : null

  const closeModal = () => {
    const hideModal = new URLSearchParams(searchParams.toString())
    Array.from(hideModal.entries()).forEach(([key]) => {
      hideModal.delete(key)
    });
    router.replace(`${pathname}?${hideModal}`)
  }

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                  {ComponentToRender ? <ComponentToRender appointment={appointment} closeModal={closeModal} /> : null}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}