import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface SimilarArticle {
  title: string;
  description: string;
  url: string;
  icon?: string;
  category?: string;
}

@Component({
  selector: 'app-similar-articles',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="similar-articles" *ngIf="articles && articles.length > 0">
      <h3><i class="pi pi-compass"></i> {{ title }}</h3>
      <div class="articles-grid">
        <a *ngFor="let article of articles"
           [routerLink]="article.url"
           class="article-card">
          <div class="article-icon" *ngIf="article.icon">
            <i [class]="article.icon"></i>
          </div>
          <div class="article-content">
            <span class="article-category" *ngIf="article.category">{{ article.category }}</span>
            <h4>{{ article.title }}</h4>
            <p>{{ article.description }}</p>
          </div>
          <div class="article-arrow">
            <i class="pi pi-arrow-right"></i>
          </div>
        </a>
      </div>
    </section>
  `,
  styles: [`
    .similar-articles {
      margin: 2rem 0;
      padding: 1.5rem;
      background: #f8fafc;
      border-radius: 12px;
    }

    h3 {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #1e293b;
      font-size: 1.15rem;
      margin: 0 0 1.25rem 0;

      i {
        color: #3b82f6;
      }
    }

    .articles-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }

    .article-card {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: white;
      border-radius: 10px;
      border: 1px solid #e2e8f0;
      text-decoration: none;
      transition: all 0.2s ease;

      &:hover {
        border-color: #3b82f6;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
        transform: translateY(-2px);

        .article-arrow i {
          transform: translateX(4px);
        }
      }
    }

    .article-icon {
      width: 48px;
      height: 48px;
      min-width: 48px;
      background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;

      i {
        font-size: 1.25rem;
        color: #3b82f6;
      }
    }

    .article-content {
      flex: 1;
      min-width: 0;

      .article-category {
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: #3b82f6;
        font-weight: 600;
      }

      h4 {
        margin: 0.25rem 0;
        color: #1e293b;
        font-size: 0.95rem;
        font-weight: 600;
        line-height: 1.3;
      }

      p {
        margin: 0;
        color: #64748b;
        font-size: 0.8rem;
        line-height: 1.4;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }

    .article-arrow {
      i {
        color: #94a3b8;
        font-size: 0.9rem;
        transition: transform 0.2s ease;
      }
    }

    :host-context(html.dark-mode) {
      .similar-articles {
        background: var(--bg-secondary);
      }

      h3 {
        color: #e2e8f0;

        i {
          color: #60a5fa;
        }
      }

      .article-card {
        background: var(--bg-card);
        border-color: var(--border-color);

        &:hover {
          border-color: #60a5fa;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
        }
      }

      .article-icon {
        background: linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.1) 100%);

        i {
          color: #60a5fa;
        }
      }

      .article-content {
        .article-category {
          color: #60a5fa;
        }

        h4 {
          color: #e2e8f0;
        }

        p {
          color: var(--text-secondary);
        }
      }

      .article-arrow i {
        color: #64748b;
      }
    }
  `]
})
export class SimilarArticlesComponent {
  @Input() articles: SimilarArticle[] = [];
  @Input() title: string = 'Articles similaires';
}
