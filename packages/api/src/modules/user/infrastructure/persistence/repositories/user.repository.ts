import { UserEntity, UserEntitySafe } from '@modules/user/domain/entities/user.entity';
import { UserRepositoryPort } from '@modules/user/domain/repositories/user.repository.port';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/common/modules/prisma';
import { hashPassword } from '@/common/utils';
import { UserMapper } from '../mappers';

@Injectable()
export class UserRepository implements UserRepositoryPort {
  constructor(private readonly prisma: PrismaService) {
  }

  async findById(id: string): Promise<UserEntitySafe | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      return null;
    }

    return UserMapper.toDomainSafe(user);
  }

  async findByIdOrThrow(id: string): Promise<UserEntitySafe> {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    return user;
  }

  async findByIdWithPassword(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      return null;
    }

    return UserMapper.toDomain(user);
  }

  async findByEmailWithPassword(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      return null;
    }

    return UserMapper.toDomain(user);
  }

  async findByEmail(email: string): Promise<UserEntitySafe | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      return null;
    }

    return UserMapper.toDomainSafe(user);
  }

  async create(user: UserEntity): Promise<UserEntitySafe> {
    const data = UserMapper.toCreateInput(user);
    const row = await this.prisma.user.create({ data });

    return UserMapper.toDomainSafe(row);
  }

  async update(id: string, user: UserEntitySafe): Promise<UserEntitySafe> {
    const data = UserMapper.toUpdateInputWithRelations(user);

    const row = await this.prisma.user.update({
      where: { id },
      data,
    });

    return UserMapper.toDomainSafe(row);
  }

  async updatePassword(id: string, password: string): Promise<UserEntitySafe> {
    const row = await this.prisma.user.update({
      where: { id },
      data:  { password: await hashPassword(password) },
    });

    return UserMapper.toDomainSafe(row);
  }
}

