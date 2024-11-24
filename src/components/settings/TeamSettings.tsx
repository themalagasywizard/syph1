import { useState } from 'react';
import { Card, Title } from '@tremor/react';
import { UserCircleIcon, TrashIcon } from '@heroicons/react/24/outline';

const mockTeamMembers = [
  {
    id: 1,
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    role: 'Sales Manager',
    permissions: ['manage_team', 'view_reports', 'edit_settings']
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    email: 'm.rodriguez@example.com',
    role: 'Senior Sales Rep',
    permissions: ['view_reports', 'make_calls']
  },
  {
    id: 3,
    name: 'Emily Watson',
    email: 'e.watson@example.com',
    role: 'Sales Rep',
    permissions: ['make_calls']
  }
];

const roles = [
  {
    name: 'Sales Manager',
    permissions: ['manage_team', 'view_reports', 'edit_settings', 'make_calls']
  },
  {
    name: 'Senior Sales Rep',
    permissions: ['view_reports', 'make_calls', 'manage_leads']
  },
  {
    name: 'Sales Rep',
    permissions: ['make_calls', 'view_basic_reports']
  }
];

export default function TeamSettings() {
  const [teamMembers, setTeamMembers] = useState(mockTeamMembers);
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    role: 'Sales Rep'
  });

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    // Add new team member logic
  };

  const handleRemoveMember = (id: number) => {
    setTeamMembers(current => current.filter(member => member.id !== id));
  };

  return (
    <div className="space-y-6">
      <Card>
        <Title>Team Members</Title>
        <div className="mt-6">
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <UserCircleIcon className="h-6 w-6 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.email}</p>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleRemoveMember(member.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card>
        <Title>Add Team Member</Title>
        <form onSubmit={handleAddMember} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={newMember.name}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={newMember.email}
              onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              value={newMember.role}
              onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              {roles.map((role) => (
                <option key={role.name} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Member
            </button>
          </div>
        </form>
      </Card>

      <Card>
        <Title>Role Permissions</Title>
        <div className="mt-6 space-y-6">
          {roles.map((role) => (
            <div key={role.name} className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">{role.name}</h3>
              <div className="space-y-2">
                {role.permissions.map((permission) => (
                  <div key={permission} className="flex items-center">
                    <span className="text-sm text-gray-600">
                      {permission.split('_').join(' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}