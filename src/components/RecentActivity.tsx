import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const activities = [
  {
    name: 'John Smith',
    email: 'john.smith@company.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop',
    action: 'requested leave',
    time: '2 hours ago',
  },
  {
    name: 'Sarah Johnson',
    email: 'sarah.j@company.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
    action: 'clocked in',
    time: '3 hours ago',
  },
  {
    name: 'Michael Chen',
    email: 'michael.c@company.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
    action: 'submitted report',
    time: '5 hours ago',
  },
];

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity, index) => (
        <div className="flex items-center" key={index}>
          <Avatar className="h-9 w-9">
            <AvatarImage src={activity.avatar} alt={activity.name} />
            <AvatarFallback>
              {activity.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.name}</p>
            <p className="text-sm text-muted-foreground">
              {activity.action} • {activity.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}