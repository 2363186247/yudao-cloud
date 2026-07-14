package cn.iocoder.yudao.module.search.dal.mongodb;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SearchDocumentRepository extends MongoRepository<SearchDocument, String> {
}
