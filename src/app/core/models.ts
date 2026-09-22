/**
 * @file models.ts
 * @description Core domain models for StudyMate AI platform.
 * All interfaces are strictly typed with no `any` types.
 */

// ─── User & Auth ─────────────────────────────────────────────────────────────

/**
 * Represents a persisted user profile stored in Firestore under /users/{uid}.
 * Roles are assigned server-side; the client registration flow enforces 'student'.
 */
export interface UserProfile {
  /** Firebase Auth UID – doubles as the Firestore document ID */
  uid: string;
  /** Display name of the user */
  name: string;
  /** Verified email address */
  email: string;
  /** Role assigned at registration – escalation prevention is enforced in rules */
  role: 'student' | 'admin';
  /** Egyptian national ID – must satisfy ^[0-9]{14}$ */
  nationalId: string;
  /** University student code – alphanumeric, enforced at registration */
  studentCode: string;
  /** University name, e.g. Example University */
  university?: string;
  /** Faculty / College name, e.g. Computer Science */
  faculty?: string;
  /** Optional phone number */
  phone?: string;
  /** Unix epoch timestamp (ms) for account creation */
  createdAt: number;
}

// ─── Academic Content ─────────────────────────────────────────────────────────

/**
 * Represents a university subject (course) available on the platform.
 * Written only by admins; read by all authenticated users.
 */
export interface Subject {
  /** Firestore document ID */
  id: string;
  /** Full subject name, e.g. "Database Systems" */
  name: string;
  /** Short code, e.g. "CS301" */
  code: string;
  /** Optional syllabus description */
  description?: string;
  /** Unix epoch timestamp (ms) for subject creation */
  createdAt: number;
}

/**
 * Represents an uploaded study material (PDF) linked to a Subject.
 * The `status` field tracks the RAG processing pipeline stage.
 */
export interface Material {
  /** Firestore document ID */
  id: string;
  /** Human-readable file name */
  name: string;
  /** Parent subject reference */
  subjectId: string;
  /** Firebase Storage download URL */
  url: string;
  /** Processing status – updated by backend Cloud Function */
  status: 'processing' | 'ready';
  /** Number of text chunks extracted from the PDF */
  chunkCount?: number;
  /** Unix epoch timestamp (ms) for upload */
  uploadedAt: number;
}

/**
 * Represents a vectorised text chunk extracted from a Material.
 * Stored in Firestore for client-side RAG retrieval.
 */
export interface Chunk {
  /** Optional Firestore document ID (auto-assigned on write) */
  id?: string;
  /** Parent subject reference */
  subjectId: string;
  /** Parent material reference */
  materialId: string;
  /** Raw text content of this chunk */
  content: string;
  /** Sequential index within the parent material */
  index: number;
}

// ─── Chat & Conversations ─────────────────────────────────────────────────────

/**
 * Represents a single message turn within a Conversation.
 * Sources are appended by the RAG pipeline for citation transparency.
 */
export interface ChatMessage {
  /** Sender role */
  role: 'user' | 'assistant';
  /** Message text */
  content: string;
  /** Unix epoch timestamp (ms) */
  timestamp: number;
  /** Optional RAG citation sources attached to an assistant reply */
  sources?: ChatMessageSource[];
}

/**
 * A cited source excerpt returned by the RAG retrieval step.
 */
export interface ChatMessageSource {
  /** Material / document title */
  title: string;
  /** Relevant text excerpt */
  excerpt: string;
  /** Optional page number within the source document */
  page?: number;
}

/**
 * Represents a full conversation session between a student and the AI
 * within the context of a specific Subject.
 * Stored under /conversations/{conversationId} in Firestore.
 */
export interface Conversation {
  /** Optional Firestore document ID (auto-assigned on create) */
  id?: string;
  /** UID of the owning student – enforced by Firestore security rules */
  userId: string;
  /** Parent subject reference */
  subjectId: string;
  /** Denormalised subject name for display without extra reads */
  subjectName: string;
  /** Ordered list of chat turns */
  messages: ChatMessage[];
  /** Unix epoch timestamp (ms) for conversation start */
  createdAt: number;
}
