export interface Project {
  id?: string;
  name: string;
  desc?: string;
  coverImg?: string;
  enabled?: boolean;
  taskLists?: string[]; // 存储 TaskList ID
  members?: string[]; // 存储成员 key 为 ID， value 为角色
}
export interface User {
  id?: string;
  email: string;
  name?: string;
  password?: string;
  avatar?: string;
  projectIds?: string[];
  taskIds?: string[];
  address?: Address;
  dateOfBirth?: string;
  identity?: Identity;
}
export interface Auth {
  user?: User;
  userId?: string;
  err?: Err;
  token?: string;
}
export enum IdentityType {
  IdCard = 0,
  Insurance,
  Passport,
  Military,
  Other
}

export interface Address {
  id?: number;
  province: string;
  city: string;
  district: string;
  street?: string;
}

export interface Identity {
  identityNo: string;
  identityType: IdentityType;
}
export interface Err {
  timestamp?: Date;
  status?: number;
  error?: string;
  exception?: string;
  message?: string;
  path?: string;
}

export interface TaskVM {
  id?: string;
  taskListId: string;
  desc: string;
  completed: boolean;
  owner?: User;
  participants?: User[];
  dueDate?: Date;
  priority: number;
  // order: number;
  remark?: string;
  // tags?: string[];
  reminder?: Date;
  createDate?: Date;
}
export interface TaskList {
  id?: string;
  name: string;
  projectId: string;
  order: number;
  taskIds?: string[];
}
export interface Task {
  id?: string;
  taskListId: string;
  desc: string;
  completed: boolean;
  ownerId: string;
  participantIds: string[];
  dueDate?: Date;
  priority: number;
  // order: number;
  remark?: string;
  // tags?: string[];
  reminder?: Date;
  createDate?: Date;
}
export interface Quote {
  id?: string;
  cn: string;
  en: string;
  pic: string;
}

