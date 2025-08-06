# mindu2.github.io
 Team Notes — 운영 가이드

> 조직 **mindu2** / 저장소 **mindu2.github.io**  
> 사이트: **https://mindu2.github.io**  
> 스택: **MkDocs(Material) + GitHub Actions + GitHub Pages**

---

## 1) 폴더 구조
docs/
til/ # TIL(일일/주간 학습)
papers/ # 논문 읽기
projects/ # 실습/프로젝트
assets/ # 이미지/첨부
_templates/ # 글 템플릿
mkdocs.yml # 사이트 설정

markdown
복사
편집

- 파일명 규칙
  - TIL: `YYYY-MM-DD-slug.md`
  - Papers/Projects: `slug.md` 또는 `YYYY-MM-slug.md`
- 노출 방법
  - 각 섹션의 `index.md`에 새 글 링크 추가  
    *(또는 `mkdocs.yml`의 `nav`에 직접 추가)*

---

## 2) 작성 방법 (웹 UI 기준)
### 새 글(TIL) 추가
1. **Add file → Create new file**  
   - `docs/til/2025-08-06-주제.md`
2. `docs/til/index.md`에 링크 한 줄 추가:
   ```md
   - [2025-08-06 — 주제](2025-08-06-주제.md)
Commit → Pull request → 리뷰 1명 승인 → Merge
→ 1–2분 후 사이트 자동 반영

이미지/다이어그램
이미지: docs/assets/diagram.png → 본문에서
![설명](../assets/diagram.png)

Mermaid:

mermaid
복사
편집
flowchart LR
  A[작성] --> B[PR]
  B --> C[Merge]
  C --> D[자동배포]
3) 협업 프로세스
기본 브랜치: main (보호)

작업 브랜치:

docs/til-YYYYMMDD-슬러그

docs/paper-슬러그

docs/project-슬러그

커밋 예: docs: add TIL about contrastive learning

PR 제목 예: [TIL] 2025-08-06: contrastive

리뷰 1명 필수, Squash merge 권장

4) 품질·보안 (Ruleset 요약)
Require a pull request before merging: ON (Approvals 1)

Require status checks to pass: ON (build, pages-build-deployment)

Require branches to be up to date: ON

Block force pushes: ON, Restrict deletions: ON

(선택) Require linear history: ON

공개 저장소 주의: 비밀정보 커밋 금지 (토큰/내부자료 등)

5) 장애 대응
증상	조치
배포 실패	Actions 로그 확인 → 누락 파일/nav 경로 수정 → 재시도
404/스타일 깨짐	배포 직후 1–2분 대기 → Ctrl+F5
수정 날짜 이상	워크플로우 actions/checkout@v4에 fetch-depth: 0 유지
긴급 롤백	이전 커밋 Revert 후 재배포

6) 유지보수 (월 1회 권장)
MkDocs/플러그인 업데이트 점검 후 배포 테스트

docs/assets 대용량/불필요 파일 정리

팀원 변동 시 권한/Ruleset/CODEOWNERS 갱신

7) 템플릿
글 템플릿 — docs/_templates/note.md

md
복사
편집
---
title: "제목"
date: 2025-08-06
tags: [ml, nlp]
authors: [이름]
---

## 요약
- 핵심 3줄

## 본문
내용...

## 참고
- 링크
PR 템플릿 — /.github/PULL_REQUEST_TEMPLATE.md

md
복사
편집
## 요약
- 변경 내용 한눈에

## 체크리스트
- [ ] mkdocs build 로컬 통과(선택)
- [ ] Front Matter(title/date/tags) 기입
- [ ] 스크린샷/다이어그램(있으면) 첨부

## 관련 이슈
- Closes #
