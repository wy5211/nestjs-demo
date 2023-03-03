import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('posts')
export class PostsEntity {
  @PrimaryGeneratedColumn()
  id: number; // 标记为主列，值自动生成

  @Column({ length: 50 })
  title: string;

  @Column({ length: 20 })
  author: string;

  @Column({ type: 'text', default: null })
  content: string;

  @Column({ default: '' })
  thumb_url: string;

  @Column('tinyint')
  type: number;

  @Column({ type: 'timestamp', default: null, name: 'create_time' })
  createTime: Date;

  @Column({ type: 'timestamp', default: null, name: 'update_time' })
  updateTime: Date;
}
