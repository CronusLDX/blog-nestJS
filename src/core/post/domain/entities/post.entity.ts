import { v4 as uuidv4 } from 'uuid';

interface PostProps {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl?: string;
  published: boolean;
  authorId: string;
  postedAt: Date;
  createdAt?: Date;
  updateAt?: Date;
}

export class PostEntity {
  readonly id?: string;
  private _title: string;
  private _slug: string;
  private _excerpt: string;
  private _content: string;
  private _coverImageUrl?: string;
  private _published: boolean;
  private _authorId: string;
  private _postedAt: Date;
  private _createdAt?: Date;
  private _updateAt?: Date;

  protected constructor(props: PostProps) {
    this.id = props.id || uuidv4();
    this._title = props.title;
    this._slug = props.slug;
    this._excerpt = props.excerpt;
    this._content = props.content;
    this._coverImageUrl = props.coverImageUrl;
    this._published = props.published;
    this._authorId = props.authorId;
    this._postedAt = props.postedAt;
    this._createdAt = props.createdAt || new Date();
    this._updateAt = props.updateAt || new Date();
  }

  public static create(
    data: Omit<PostProps, 'id' | 'createdAt' | 'updateAt'>,
  ): PostEntity {
    return new PostEntity({
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      coverImageUrl: data.coverImageUrl,
      published: data.published,
      authorId: data.authorId,
      postedAt: data.postedAt,
    });
  }

  public static restore(data: PostProps): PostEntity {
    return new PostEntity({
      id: data.id,
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      coverImageUrl: data.coverImageUrl,
      published: data.published,
      authorId: data.authorId,
      postedAt: data.postedAt,
      createdAt: data.createdAt,
      updateAt: data.updateAt,
    });
  }

  get title(): string {
    return this._title;
  }

  get slug(): string {
    return this._slug;
  }

  get excerpt(): string {
    return this._excerpt;
  }

  get content(): string {
    return this._content;
  }

  get coverImageUrl(): string | undefined {
    return this._coverImageUrl;
  }

  get published(): boolean {
    return this._published;
  }

  get authorId(): string {
    return this._authorId;
  }

  get createdAt(): Date | undefined {
    return this._createdAt;
  }

  get updateAt(): Date | undefined {
    return this._updateAt;
  }
  get postedAt(): Date {
    return this._postedAt;
  }

  changeTitle(title: string): void {
    this._title = title;
  }

  changeSlug(slug: string): void {
    this._slug = slug;
  }

  changeExcerpt(excerpt: string): void {
    this._excerpt = excerpt;
  }

  changeContent(content: string): void {
    this._content = content;
  }

  changeCoverImageUrl(coverImageUrl: string): void {
    this._coverImageUrl = coverImageUrl;
  }

  changePublished(published: boolean): void {
    this._published = published;
  }

  public export(): object {
    // Referencia ao Json Presenter no controller, terá que chamar o metodo export
    return {
      id: this.id,
      title: this.title,
      slug: this.slug,
      excerpt: this.excerpt,
      content: this.content,
      coverImageUrl: this.coverImageUrl,
      published: this.published,
      authorId: this.authorId,
      postedAt: this._postedAt,
      createdAt: this.createdAt,
      updateAt: this.updateAt,
    };
  }
}
