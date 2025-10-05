import { CreateEventSchema, trpc } from '@/shared/api';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { EditEventForm } from '@/features/edit-event';

export default function EditEvent() {
  const router = useRouter();
  const session = useSession();

  const eventId = Number(router.query.id);

  const { data, isLoading } = trpc.event.findUnique.useQuery({
    id: Number(router.query.id),
  });

  const { mutate, isLoading: isUpdating } = trpc.event.update.useMutation({
    onSuccess: () => {
      router.push(`/events/${eventId}`);
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  const onSubmit = (data: CreateEventSchema) => {
    mutate({
      id: eventId,
      title: data.title,
      description: data.description,
      date: new Date(data.date),
    });
  };

  const handleSubmit = (data: CreateEventSchema) => {
    onSubmit(data);
  };

  if (isLoading) {
    return 'Loading...';
  }

  if (isUpdating) {
    return 'isUpdating...';
  }

  if (session.status === 'unauthenticated') {
    return 'Forbidden';
  }

  if (!data) {
    return 'No data';
  }

  if (data.authorId !== session.data?.user.id) {
    return 'No editing rights';
  }

  return <EditEventForm event={data} onSubmit={handleSubmit} />;
}
