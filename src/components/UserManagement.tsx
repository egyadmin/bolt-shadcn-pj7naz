import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { CheckCircle, XCircle } from 'lucide-react';

export function UserManagement() {
  const { pendingUsers, activateUser, user } = useAuth();

  if (user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">User Management</h2>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pendingUsers.map((pendingUser) => (
            <TableRow key={pendingUser.email}>
              <TableCell>{pendingUser.name}</TableCell>
              <TableCell>{pendingUser.email}</TableCell>
              <TableCell>
                {pendingUser.isActive ? (
                  <span className="flex items-center text-green-600">
                    <CheckCircle className="mr-2 h-4 w-4" /> Active
                  </span>
                ) : (
                  <span className="flex items-center text-yellow-600">
                    <XCircle className="mr-2 h-4 w-4" /> Pending
                  </span>
                )}
              </TableCell>
              <TableCell>
                {!pendingUser.isActive && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => activateUser(pendingUser.email)}
                  >
                    Activate User
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}